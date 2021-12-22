import { ObjectId } from "mongoose";

export type ProfileExperience = {
  title: string;
  company: string;
  location?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  description?: string;
};

export type ProfileEducation = {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
};

export type ProfileSocial = {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
};

export interface Profile {
  user: ObjectId;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: string[];
  bio?: string;
  githubusername?: string;
  experience: ProfileExperience[];
  education: ProfileEducation[];
  social: ProfileSocial[];
  date?: Date;
}
