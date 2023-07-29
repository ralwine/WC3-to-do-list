CREATE TABLE "todos" (
	"id" serial primary key,
	"task" varchar(100) not null,
	"complete" BOOLEAN DEFAULT FALSE
);