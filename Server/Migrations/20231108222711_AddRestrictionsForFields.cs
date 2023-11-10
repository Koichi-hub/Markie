using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddRestrictionsForFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Guid",
                keyValue: new Guid("d408d909-58b1-45cd-abdb-156622776fcc"));

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Users",
                type: "character varying(64)",
                maxLength: 64,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "character varying(128)",
                maxLength: 128,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Login",
                table: "Users",
                type: "character varying(64)",
                maxLength: 64,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Tags",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Notes",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Notes",
                type: "character varying(1024)",
                maxLength: 1024,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Guid", "CreatedAt", "Login", "Password", "Role", "UpdatedAt", "UserName" },
                values: new object[] { new Guid("ba77e58c-0717-474d-b251-b1fd5246c2d2"), new DateTime(2023, 11, 8, 22, 27, 10, 983, DateTimeKind.Utc).AddTicks(5781), "admin", "password", 1000, new DateTime(2023, 11, 8, 22, 27, 10, 983, DateTimeKind.Utc).AddTicks(5784), "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Guid",
                keyValue: new Guid("ba77e58c-0717-474d-b251-b1fd5246c2d2"));

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(64)",
                oldMaxLength: 64);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(128)",
                oldMaxLength: 128,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Login",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(64)",
                oldMaxLength: 64,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Tags",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(32)",
                oldMaxLength: 32);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Notes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(32)",
                oldMaxLength: 32);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Notes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(1024)",
                oldMaxLength: 1024);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Guid", "CreatedAt", "Login", "Password", "Role", "UpdatedAt", "UserName" },
                values: new object[] { new Guid("d408d909-58b1-45cd-abdb-156622776fcc"), new DateTime(2023, 11, 7, 5, 2, 56, 225, DateTimeKind.Utc).AddTicks(2154), "admin", "password", 1000, new DateTime(2023, 11, 7, 5, 2, 56, 225, DateTimeKind.Utc).AddTicks(2157), "admin" });
        }
    }
}
