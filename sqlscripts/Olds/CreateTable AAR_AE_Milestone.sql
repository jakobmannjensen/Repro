use Repro;

create table AAR_AE_Milestone
(
	MilestoneID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ShortWorkflowTaskID int FOREIGN KEY REFERENCES AAR_AE_Job(ShortWorkflowTaskID),
	MilestoneTypeID int FOREIGN KEY REFERENCES AAR_AE_MilestoneType(MilestoneTypeID),
	LogTime datetime
);