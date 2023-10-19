import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { db } from "./db";

const Person = db.Person;

export const peopleService = {
  authenticate,
  getAll,
  getById,
  getCurrent,
  create,
  update,
  delete: _delete,
};

async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const person = await Person.findOne({ email });

  if (!(person && bcrypt.compareSync(password, person.hash))) {
    throw "Email or password is incorrect";
  }

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: person.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return {
    person: person.toJSON(),
    token,
  };
}

async function getAll() {
  return await Person.find();
}

async function getById(id: string) {
  try {
    return await Person.findById(id);
  } catch {
    throw "Person Not Found";
  }
}

async function getCurrent() {
  try {
    const currentPersonId = headers().get("personId");
    return await Person.findById(currentPersonId);
  } catch {
    throw "Current Person Not Found";
  }
}

async function create(params: any) {
  // validate
  if (await Person.findOne({ email: params.email })) {
    throw 'Email "' + params.email + '" is already taken';
  }

  const person = new Person(params);

  // hash password
  if (params.password) {
    person.hash = bcrypt.hashSync(params.password, 10);
  }

  // save person
  await person.save();
}

async function update(id: string, params: any) {
  const person = await Person.findById(id);

  // validate
  if (!person) throw "Person not found";
  if (
    person.email !== params.email &&
    (await Person.findOne({ email: params.email }))
  ) {
    throw 'Email "' + params.email + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = bcrypt.hashSync(params.password, 10);
  }

  // copy params properties to user
  Object.assign(person, params);

  await person.save();
}

async function _delete(id: string) {
  await Person.findByIdAndRemove(id);
}
