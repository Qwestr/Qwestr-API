import { PrismaClient } from "@prisma/client";
import * as bodyParser from "body-parser";
import express from "express";

const prisma = new PrismaClient();
const app = express();

// Helper methods

const catchAsync = (fn: any) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};

// Coniguration

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
      // Get the entity
      const result = await prisma.user.findOne({
        where: {
          id: Number(id),
        },
      });
      // Return the result (as an array)
      res.json([result]);
    } else {
      // Define parameters
      const params = {
        skip: parseInt(_start),
        take: parseInt(_end),
        // TODO: address order symbol discrepencies btw Prisma/ RA
        orderBy: {
          [_sort]: _order == "ASC" ? "asc" : "desc",
        },
      };
      // Get the collection
      const result = await prisma.user.findMany(params);
      // Set the headers
      res.set("x-total-count", result.length.toString());
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
        id: Number(id),
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
      where: { id: Number(id) },
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
        id: Number(id),
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
    const { id, _start, _end, _sort, _order } = req.query;
    // TODO: design better solution for handling 'id' being passed
    // in as a query parameter by react-admin
    if (id) {
      // Get the entity
      const result = await prisma.user.findOne({
        where: {
          id: Number(id),
        },
      });
      // Return the result (as an array)
      res.json([result]);
    } else {
      // Define parameters
      const params = {
        skip: parseInt(_start),
        take: parseInt(_end),
        // TODO: address order symbol discrepencies btw Prisma/ RA
        orderBy: {
          [_sort]: _order == "ASC" ? "asc" : "desc",
        },
      };
      // Get the collection
      const result = await prisma.qwest.findMany(params);
      // Set headers
      res.set("x-total-count", result.length.toString());
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
        id: Number(id),
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
      where: { id: Number(id) },
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
        id: Number(id),
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

const server = app.listen(3001, () =>
  console.log("🚀 Server ready at: http://localhost:3001")
);
