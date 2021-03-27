const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conncted to mongoDB..."))
  .catch((err) => console.log("Could not connect to mongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Git & GitHub",
    author: "John",
    tags: ["cvs", "coding"],
    isPublished: false,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function getCourses() {
  const pageNumber = 2;
  const pasgeSize = 10;
  const courses = await Course.find({ author: /.*mosh.*/i })
    .skip((pageNumber - 1) * pasgeSize)
    .limit(pasgeSize)
    .sort({ name: 1 })
    .count();

  console.log(courses);
}

async function updateCourse(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        author: "Moshfegh",
        isPublished: false,
      },
    }
  );
  console.log(result);
}

async function deleteCourse(id) {
  const course = await Course.findByIdAndRemove(id);
}

createCourse();
