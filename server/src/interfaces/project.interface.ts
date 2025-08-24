export interface ICreateProject {
    projectName: string;
    projectStatus: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
    projectDescription: string;
    projectStartDate: Date;
    projectEndDate?: Date;
    projectBudget: number;
}

export interface IUpdateProject {
    projectName?: string;
    projectStatus?: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
    projectDescription?: string;
    projectProgress?: number;
    projectStartDate?: Date;
    projectEndDate?: Date;
    projectBudget?: number;
}
