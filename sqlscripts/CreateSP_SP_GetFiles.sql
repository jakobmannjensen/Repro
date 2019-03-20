CREATE PROCEDURE SP_GetFiles
AS
BEGIN
    SELECT AE_File.AE_ShortID, AE_File.AE_Job_INorOUT, AE_File.AE_Job_Path
    FROM AE_File
    LEFT JOIN AE_Job ON AE_File.AE_ShortID = AE_Job.Job_ShortID
END