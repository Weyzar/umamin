import { nanoid } from "nanoid";
import builder from "../../builder";
import { db } from "../../../db";
import { CreateMessageInput } from "./types";
import { message, user } from "../../../db/schema";
import { eq } from "drizzle-orm";

builder.queryFields((t) => ({
  messages: t.field({
    type: ["Message"],
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { userId }) => {
      try {
        const result = await db.query.message.findMany({
          where: eq(user.id, userId),
        });
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),

  allMessages: t.field({
    type: ["Message"],
    resolve: async () => {
      try {
        const result = await db.query.message.findMany();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),
}));

builder.mutationFields((t) => ({
  createMessage: t.field({
    type: "Message",
    args: {
      input: t.arg({ type: CreateMessageInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      try {
        const result = await db
          .insert(message)
          .values({ id: nanoid(), ...input })
          .returning();

        return result[0];
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }),
}));
