using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Guid",
                keyValue: new Guid("d7af2b14-37cb-42f2-9031-fb27956e76c6"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Guid", "CreatedAt", "Login", "Password", "Role", "UpdatedAt", "UserName" },
                values: new object[] { new Guid("13d49ee6-4663-41ec-a44b-e74b7a56c666"), new DateTime(2023, 10, 24, 19, 57, 10, 761, DateTimeKind.Utc).AddTicks(9444), "admin", "password", 1000, new DateTime(2023, 10, 24, 19, 57, 10, 761, DateTimeKind.Utc).AddTicks(9446), "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_OAuths_Email",
                table: "OAuths",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OAuths_Id",
                table: "OAuths",
                column: "Id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OAuths_Email",
                table: "OAuths");

            migrationBuilder.DropIndex(
                name: "IX_OAuths_Id",
                table: "OAuths");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Guid",
                keyValue: new Guid("13d49ee6-4663-41ec-a44b-e74b7a56c666"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Guid", "CreatedAt", "Login", "Password", "Role", "UpdatedAt", "UserName" },
                values: new object[] { new Guid("d7af2b14-37cb-42f2-9031-fb27956e76c6"), new DateTime(2023, 10, 24, 19, 56, 2, 414, DateTimeKind.Utc).AddTicks(7766), "admin", "password", 1000, new DateTime(2023, 10, 24, 19, 56, 2, 414, DateTimeKind.Utc).AddTicks(7772), "Admin" });
        }
    }
}
