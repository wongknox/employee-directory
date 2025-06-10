import express from "express";
import employees from "#db/employees";

const app = express();

app.use(express.json());

export default app;

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.route("/employees/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

app.route("/employees").get((req, res) => {
  res.send(employees);
});

app.route("/employees/:id").get((req, res) => {
  const { id } = req.params;
  const employeeId = parseInt(id, 10);

  const employee = employees.find((emp) => emp.id === employeeId);

  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  res.send(employee);
});

app.use((req, res) => {
  res.status(404).send("API route not found.");
});
