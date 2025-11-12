/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

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
