// EVENTS ROUTES / CALENDAR EVENTS
// Host + /api/events/
const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { fieldValidator } = require("../middlewares/field-validator");
const { jwtValidator } = require("../middlewares/jwt-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const router = Router();

// ALL EVENTS ROUTES WILL BE VALIDATED BY JWT
router.use(jwtValidator); // Using the middleware in this way would validate all the request's token below

router.get(
  "/",
  //   [
  //     check("title", "Title is required").not().isEmpty(),
  //     check("start", "Start date is required").custom(isDate),
  //     //    check("end", "Title is required").not().isEmpty(),
  //     fieldValidator,
  //   ],
  getEvents
);
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    fieldValidator,
  ],
  createEvent
);
router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    fieldValidator,
  ],
  updateEvent
);
router.delete("/:id", deleteEvent);

module.exports = router;
