--use Repro;
use mannen_dk_db;

create table AE_Job
(
	AE_JobID varchar(100) not null primary key,
	WorkflowName varchar(255),
	Job_ShortID int,
	Job_Server varchar(100),
	Job_JobFolder varchar(255),
	Job_Operator varchar(255),
	Job_Priority varchar(20),
	Job_StartTime datetime,
	Job_EndTime datetime,
	Job_Status varchar(20),
	Job_WorkflowStatus varchar(20)
);
