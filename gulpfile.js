import { deleteSync } from "del";
import gulp from "gulp";
import zip from "gulp-zip";

gulp.task(
  'prefillBundle',
  () => gulp.src(".bundlebase/**/*").pipe(gulp.dest("./bundle/"))
);

gulp.task(
  'copyDistInBundle',
  () => gulp.src("dist/**/*").pipe(gulp.dest("./bundle/dist"))
);

gulp.task(
  "zipBundle",
  () => gulp
    .src("./bundle/**/*")
    .pipe(zip("bundle.zip"))
    .pipe(gulp.dest("./"))
);

gulp.task(
  "deleteBundle",
  async () => deleteSync("bundle")
);

gulp.task("bundle", gulp.series(["prefillBundle", "copyDistInBundle"]));
gulp.task("bundle:zip", gulp.series(["bundle", "zipBundle", "deleteBundle"]));
