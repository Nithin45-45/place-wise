/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: jobpostings
 * Interface for JobPostings
 */
export interface JobPostings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType image */
  companyLogo?: string;
  /** @wixFieldType text */
  jobDescription?: string;
  /** @wixFieldType text */
  jobLocation?: string;
  /** @wixFieldType text */
  employmentType?: string;
  /** @wixFieldType text */
  salaryRange?: string;
  /** @wixFieldType date */
  applicationDeadline?: Date | string;
  /** @wixFieldType text */
  requiredSkills?: string;
  /** @wixFieldType text */
  experienceLevel?: string;
  /** @wixFieldType text */
  contactEmail?: string;
  /** @wixFieldType url */
  applicationUrl?: string;
}

/**
 * Collection ID: jobpostings
 * Interface for JobPostings
 */
export interface JobPostings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType image */
  companyLogo?: string;
  /** @wixFieldType text */
  jobDescription?: string;
  /** @wixFieldType text */
  jobLocation?: string;
  /** @wixFieldType text */
  employmentType?: string;
  /** @wixFieldType text */
  salaryRange?: string;
  /** @wixFieldType date */
  applicationDeadline?: Date | string;
  /** @wixFieldType text */
  requiredSkills?: string;
  /** @wixFieldType text */
  experienceLevel?: string;
  /** @wixFieldType text */
  contactEmail?: string;
  /** @wixFieldType url */
  applicationUrl?: string;
}


/**
 * Collection ID: studentplacements
 * Interface for StudentPlacements
 */
export interface StudentPlacements {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  placementStatus?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType date */
  endDate?: Date | string;
  /** @wixFieldType url */
  companyWebsite?: string;
  /** @wixFieldType url */
  offerLetterUrl?: string;
}


/**
 * Collection ID: studentprofiles
 * Interface for StudentProfiles
 */
export interface StudentProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  studentId?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  major?: string;
  /** @wixFieldType number */
  gpa?: number;
  /** @wixFieldType date */
  graduationDate?: Date | string;
  /** @wixFieldType url */
  resumeUrl?: string;
  /** @wixFieldType image */
  profilePicture?: string;
}
