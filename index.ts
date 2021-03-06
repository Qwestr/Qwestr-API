import { PrismaClient } from "@prisma/client";
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const prisma = new PrismaClient();
const app = express();

// Define constants

const PORT = process.env.PORT || 3001;

// Helper methods

const catchAsync = (fn: any) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};

// Configure CORS

const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  exposedHeaders: ["X-Total-Count"],
//   credentials: true,
//   methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//   origin: API_URL,
//   preflightContinue: false
};

app.use(cors(options))

// Configure JSON responses

app.use(bodyParser.json());

// Users APIs

app.get(
  `/users`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request query
    const { id, _start, _end, _sort, _order } = req.query;
    // TODO: design better solution for handling 'id' being passed
    // in as a query parameter by react-admin
    if (id) {
      // Get the collection
      const result = await prisma.user.findMany({
        where: {
          id: { in: [...id].map((x) => +x) },
        },
      });
      // Return the result
      res.json(result);
    } else {
      // Define parameters
      const params = {
        skip: +_start,
        take: +_end,
        // TODO: address order symbol discrepencies btw Prisma/ RA
        orderBy: {
          [_sort]: _order == "ASC" ? "asc" : "desc",
        },
      };
      // Get the collection
      const result = await prisma.user.findMany(params);
      // Set the headers
      res.set("X-Total-Count", result.length.toString());
      // Return the result
      res.json(result);
    }
  })
);

app.post(
  `/users`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request body
    const { email, name } = req.body;
    // Create the entity
    const result = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    // Return the result
    res.json(result);
  })
);

app.get(
  `/users/:id`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Get the entity
    const result = await prisma.user.findOne({
      where: {
        id: +id,
      },
    });
    // Return the result
    res.json(result);
  })
);

app.put(
  "/users/:id",
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Deserialize the request body
    const { name } = req.body;
    // Update the entity
    const result = await prisma.user.update({
      where: { id: +id },
      data: {
        name,
      },
    });
    // Return the result
    res.json(result);
  })
);

app.delete(
  `/users/:id`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Delete the entity
    const result = await prisma.user.delete({
      where: {
        id: +id,
      },
    });
    // Return the result
    res.json(result);
  })
);

// Qwests APIs

app.get(
  `/qwests`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request query
    const {
      id,
      completeByNo,
      completeByYes,
      q,
      userId,
      _start,
      _end,
      _sort,
      _order,
    } = req.query;
    // TODO: design better solution for handling 'id' being passed
    // in as a query parameter by react-admin
    if (id) {
      // Get the collection
      const result = await prisma.user.findMany({
        where: {
          id: { in: [...id].map((x) => +x) },
        },
      });
      // Return the result (as an array)
      res.json([result]);
    } else {
      // Define parameters
      let params: any = {
        skip: +_start,
        take: +_end,
        // TODO: address order symbol discrepencies btw Prisma/ RA
        orderBy: {
          [_sort]: _order == "ASC" ? "asc" : "desc",
        },
      };
      // Check for search query/ filters
      if ([q, completeByNo, completeByYes, userId].some((x) => !!x)) {
        // Define params' where list
        params.where = {
          AND: [],
        };
        // Add where clause for each filter
        if (q) {
          params.where.AND.push({ title: { contains: q } });
        }
        if (userId) {
          params.where.AND.push({ userId: { in: [...userId].map((x) => +x) } });
        }
        if (completeByNo && !completeByYes) {
          params.where.AND.push({ completeBy: null });
        }
        if (completeByYes && !completeByNo) {
          params.where.AND.push({ NOT: [{ completeBy: null }] });
        }
      }
      // Get the collection
      const result = await prisma.qwest.findMany(params);
      // Set headers
      res.set("X-Total-Count", result.length.toString());
      // Return the result
      res.json(result);
    }
  })
);

app.post(
  `/qwests`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request body
    const { title, completeBy, userId } = req.body;
    // Create the entity
    const result = await prisma.qwest.create({
      data: {
        title,
        completeBy,
        user: { connect: { id: userId } },
      },
    });
    // Return the result
    res.json(result);
  })
);

app.get(
  `/qwests/:id`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Get the entity
    const result = await prisma.qwest.findOne({
      where: {
        id: +id,
      },
    });
    // Return the result
    res.json(result);
  })
);

app.put(
  "/qwests/:id",
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Deserialize the request body
    const { title, completeBy, userId } = req.body;
    // Update the entity
    const result = await prisma.qwest.update({
      where: { id: +id },
      data: {
        title,
        completeBy,
        user: { connect: { id: userId } },
      },
    });
    // Return the result
    res.json(result);
  })
);

app.delete(
  `/qwests/:id`,
  catchAsync(async (req: any, res: any, _next: any) => {
    // Deserialize the request params
    const { id } = req.params;
    // Delete the entity
    const result = await prisma.qwest.delete({
      where: {
        id: +id,
      },
    });
    // Return the result
    res.json(result);
  })
);

// Error handling

app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(500);
  res.json({ error: err });
});

// Run the application

app.listen(process.env.PORT || 3001, () =>
  console.log("🚀 Server ready @ port: ", PORT)
);
