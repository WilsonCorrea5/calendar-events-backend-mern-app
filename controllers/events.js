const { response } = require("express");
const Event = require("../models/event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");
  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();
    res.status(201).json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }
    console.log(event.user.toString(), "  =  ", req.uid);
    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "Access denied to edit this event",
      });
    }
    const newEvent = {
      ...req.body,
      user: req.uid,
    };
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    res.json({
      ok: true,
      updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }
    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "Access denied to delete this event",
      });
    }
    await Event.findByIdAndDelete(eventId);
    res.json({
      ok: true,
      msg: "Event was deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};
module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
