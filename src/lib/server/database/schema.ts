import { pgTable, uuid, date, text, timestamp, pgEnum, integer, boolean } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["male", "female", "other"]);
export const roleEnum = pgEnum("role", ["admin", "user"]);

export const userTable = pgTable("users", {
    id: uuid("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull().unique(),
    dateOfBirth: date("date_of_birth", { mode: "date" }).notNull(),
    gender: genderEnum("gender").notNull(),
    weight: integer("weight").notNull(),
    role: roleEnum("role").default("user").notNull(),
    isTrusted: boolean("is_trusted").default(false).notNull(),
    //TODO: add tags (enum of strings)
    createdAt: timestamp("created_at",{
        withTimezone: true,
        mode: "date",
    }).defaultNow().notNull(),
    lastSignInAt: timestamp("last_sign_in_at",{
        withTimezone: true,
        mode: "date",
    }),
});

export const exerciseTable = pgTable("exercises", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    description: text("description").notNull(),
});

export const recordTable = pgTable("records", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => userTable.id, {onDelete: "cascade"}),
    exerciseId: uuid("exercise_id").notNull().references(() => exerciseTable.id),
    liftedWeight: integer("lifted_weight").notNull(),
    addedAt: timestamp("added_at",{
        withTimezone: true,
        mode: "date",
    }).defaultNow().notNull(),
});