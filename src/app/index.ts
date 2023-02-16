import path from 'path';
import http from 'http';
import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError, { HttpError } from 'http-errors';
import middleware from './middleware';

const app: Application = express();
const PORT = 3000;

// view engine setup
app.set('views', path.join(__dirname, '../..', 'views'));
app.set('view engine', 'ejs');

app.use(middleware.requestTime);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../..', 'public')));

app.get('/', function (req: Request, res: Response) {
  res.render('index', { title: 'Express' });
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ! Server Configuration
const httpServer = new http.Server(app);

const server = httpServer.listen(PORT, () =>
  console.log(`app is running ... at port=${PORT} env=${process.env.NODE_ENV || 'development'}`)
);

export default server;