export declare enum UserRole {
    APPLICANT = "applicant",
    RECRUITER = "recruiter",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    department: string;
    createdAt: Date;
    updatedAt: Date;
}
