CREATE PROCEDURE CompleteAE_Job 
    @AE_JobID varchar(100),
    @WorkflowName varchar(255),
	@Job_ShortID int,
	@Job_Server varchar(100),
	@Job_JobFolder varchar(255),
	@Job_Operator varchar(255),
	@Job_Priority varchar(20),
	@Job_StartTime datetime,
	@Job_EndTime datetime,
	@Job_Status varchar(20),
	@Job_WorkflowStatus varchar(20)
AS
BEGIN
    UPDATE AE_Job
    SET WorkflowName = @WorkflowName,
    Job_ShortID = @Job_ShortID,
    Job_Server = @Job_Server,
	Job_JobFolder = @Job_JobFolder,
	Job_Operator = @Job_Operator,
	Job_Priority = @Job_Priority,
	Job_StartTime = @Job_StartTime,
	Job_EndTime = @Job_EndTime,
	Job_Status = @Job_Status,
	Job_WorkflowStatus = @Job_WorkflowStatus
    WHERE AE_JobID = @AE_JobID
END