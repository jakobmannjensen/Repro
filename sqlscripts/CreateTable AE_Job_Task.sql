use Repro;
--use mannen_dk_db;

create table AE_Job_Task
(
	AE_Job_TaskID int not null primary key identity,
	AE_JobID varchar(100) FOREIGN KEY REFERENCES AE_Job(AE_JobID),
	TaskName varchar(255),
	TicketName varchar(255),
	TaskTitle varchar(255),
	Task_ShortID int,
	Task_Parameters varchar(255),
	Task_Operator varchar(255),
	Task_Server varchar(100),
	Task_JobFolder varchar(255),
	Task_Priority varchar(20),
	Task_StartTime datetime,
	Task_EndTime datetime,
	Task_Status varchar(20),
	Task_WorkflowStatus varchar(20)
);
