using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddRefreshToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Guid",
                keyValue: new Guid("13d49ee6-4663-41ec-a44b-e74b7a56c666"));

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "Sessions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Guid", "CreatedAt", "Login", "Password", "Role", "UpdatedAt", "UserName" },
                values: new object[] { new Guid("ad4e3c10-9b3d-452b-a48f-23253c2204e8"), new DateTime(2023, 11, 3, 1, 30, 34, 937, DateTimeKind.Utc).AddTicks(7972), "admin", "password", 1000, new DateTime(2023, 11, 3, 1, 30, 34, 937, DateTimeKind.Utc).AddTicks(7974), "Admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Guid",
                keyValue: new Guid("ad4e3c10-9b3d-452b-a48f-23253c2204e8"));

            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "Sessions");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Guid", "CreatedAt", "Login", "Password", "Role", "UpdatedAt", "UserName" },
                values: new object[] { new Guid("13d49ee6-4663-41ec-a44b-e74b7a56c666"), new DateTime(2023, 10, 24, 19, 57, 10, 761, DateTimeKind.Utc).AddTicks(9444), "admin", "password", 1000, new DateTime(2023, 10, 24, 19, 57, 10, 761, DateTimeKind.Utc).AddTicks(9446), "Admin" });
        }
    }
}
