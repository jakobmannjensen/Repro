select *
FROM AE_Job
INNER JOIN AE_File
ON AE_Job.Job_ShortID = AE_File.AE_ShortID
WHERE AE_Job_INorOUT = 'INPUT'