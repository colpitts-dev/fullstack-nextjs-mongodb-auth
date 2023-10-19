import mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const db = {
  Person: personModel(),
};

// mongoose models with schema definitions

function personModel() {
  const schema = new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, unique: true, required: true },
      hash: { type: String, required: true },
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.hash;
    },
  });

  return mongoose.models.Person || mongoose.model("Person", schema);
}
