const mongoose = require("mongoose");
const Face = require("./faceModel");
const Complaint = require("./complaint");
const PassRequest = require("./passRequest");
const fs = require("fs");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
  profileImage: {
    type: String,
  },

  fullName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  DOB: {
    type: Array,
    required: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    address: {
      country: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
    },
  },
  education: {
    school: {
      name: {
        type: String,
        required: true,
      },
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
    college: {
      name: {
        type: String,
        required: true,
      },
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
    degree: {
      name: {
        type: String,
        required: true,
      },
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
  },
  faceDescriptions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Face",
  },
  dayPassRequest: {
    type: mongoose.Schema.Types.ObjectId,
  },
  nightPassRequest: {
    type: mongoose.Schema.Types.ObjectId,
  },
  complaint: [mongoose.Schema.Types.ObjectId],
  hostelInfo: {
    roomNo: {
      type: String,
      required: true,
    },
    hostelNo: {
      type: String,
      required: true,
    },
  },
  recoveryQs: {
    q1: {
      type: String,
    },
    q2: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "hostellite",
    required: true,
  },
});

// adding a middleware to student schema so that it could run before deleting some student
studentSchema.post("findOneAndDelete", async function (deletedHostellite, next) {
  // Delete any face descriptions
  if (deletedHostellite.faceDescriptions) {
    const res = await Face.findOneAndDelete({ _id: deletedHostellite.faceDescriptions });
  }

  //Delete any associated files
  if (deletedHostellite.profileImage) {
    fs.unlink("public/hostel-files/hostellite-profile-images/" + deletedHostellite.profileImage, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  // Delete any complaints
  if (deletedHostellite.complaint.length) {
    for (complaintId of deletedHostellite.complaint) {
      await Complaint.findByIdAndDelete(complaintId);
    }
  }

  // Delete any pass requests
  if (deletedHostellite.nightPassRequest) {
    await PassRequest.findByIdAndDelete(deletedHostellite.nightPassRequest);
  }
  // Delete any pass requests
  if (deletedHostellite.dayPassRequest) {
    await PassRequest.findByIdAndDelete(deletedHostellite.dayPassRequest);
  }
  next();
});

// pre findOneAndUpdate check if the password is updated, if so, then hash the password
// studentSchema.pre("updateOne", async function (next) {
//   try {
//     if (this._update.password) {
//       console.log(this);
//       const hashed = await bcrypt.hash(this._update.password, 10);
//       this._update.password = hashed;
//       console.log(this);
//     }
//     next();
//   } catch (err) {
//     return next(err);
//   }
// });

//The following statement will add username and password field to our schema and will make sure that the usename is unique
studentSchema.plugin(passportLocalMongoose);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
