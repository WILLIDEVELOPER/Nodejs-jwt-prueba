import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
    profileImage: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    company: {
      type: String,
    },
    sector: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    about: {
      type: String,
    },
    experience: [
      {
        title: {
          type: String,
        },
        company: {
          type: String,
        },
        description: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
      },
    ],
    personalInfo: {
      fullName: {
        type: String,
      },
      birthdate: {
        type: Date,
      },
      address: {
        type: String,
      },
      phone: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      website: {
        type: String,
      },
    },
    education: [
      {
        institutionName: {
          type: String,
        },
        degree: {
          type: String,
        },
        fieldOfStudy: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        activitiesAndSocieties: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("usuarios", userSchema);
