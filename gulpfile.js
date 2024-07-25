import { deleteSync } from "del";
import gulp from "gulp";
import zip from "gulp-zip";

const makeBundle = () => gulp
  .src(".bundlebase/**/*").pipe(gulp.dest("./bundle/"))
  .src("dist/**/*").pipe(gulp.dest("./bundle/dist"));

const zipBundle = () => gulp
  .src("./bundle/**/*")
  .pipe(zip("bundle.zip"))
  .pipe(gulp.dest("./"));

const deleteBundle = async () => deleteSync("bundle");

gulp.task("bundle", makeBundle);

gulp.task("bundle:zip", async () => {
  makeBundle();
  zipBundle();
  await deleteBundle();
});
