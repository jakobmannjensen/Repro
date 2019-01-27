use Repro;

create table AAR_AE_Job
(
	ShortWorkflowTaskID int NOT NULL PRIMARY KEY,
	WorkflowName varchar(255),
	InputFileName varchar(255),
	startTime datetime,
	status TINYINT
);