/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Product] ALTER COLUMN [tags] NVARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE [dbo].[User] ALTER COLUMN [phone] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[User] ALTER COLUMN [position] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[User] ADD [password] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
