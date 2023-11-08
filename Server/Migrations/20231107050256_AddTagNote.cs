using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddTagNote : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NoteTag");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Guid",
                keyValue: new Guid("ad4e3c10-9b3d-452b-a48f-23253c2204e8"));

            migrationBuilder.CreateTable(
                name: "TagNotes",
                columns: table => new
                {
                    TagGuid = table.Column<Guid>(type: "uuid", nullable: false),
                    NoteGuid = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagNotes", x => new { x.NoteGuid, x.TagGuid });
                    table.ForeignKey(
                        name: "FK_TagNotes_Notes_NoteGuid",
                        column: x => x.NoteGuid,
                        principalTable: "Notes",
                        principalColumn: "Guid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TagNotes_Tags_TagGuid",
                        column: x => x.TagGuid,
                        principalTable: "Tags",
                        principalColumn: "Guid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Guid", "CreatedAt", "Login", "Password", "Role", "UpdatedAt", "UserName" },
                values: new object[] { new Guid("d408d909-58b1-45cd-abdb-156622776fcc"), new DateTime(2023, 11, 7, 5, 2, 56, 225, DateTimeKind.Utc).AddTicks(2154), "admin", "password", 1000, new DateTime(2023, 11, 7, 5, 2, 56, 225, DateTimeKind.Utc).AddTicks(2157), "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_TagNotes_TagGuid",
                table: "TagNotes",
                column: "TagGuid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TagNotes");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Guid",
                keyValue: new Guid("d408d909-58b1-45cd-abdb-156622776fcc"));

            migrationBuilder.CreateTable(
                name: "NoteTag",
                columns: table => new
                {
                    NotesGuid = table.Column<Guid>(type: "uuid", nullable: false),
                    TagsGuid = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoteTag", x => new { x.NotesGuid, x.TagsGuid });
                    table.ForeignKey(
                        name: "FK_NoteTag_Notes_NotesGuid",
                        column: x => x.NotesGuid,
                        principalTable: "Notes",
                        principalColumn: "Guid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NoteTag_Tags_TagsGuid",
                        column: x => x.TagsGuid,
                        principalTable: "Tags",
                        principalColumn: "Guid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Guid", "CreatedAt", "Login", "Password", "Role", "UpdatedAt", "UserName" },
                values: new object[] { new Guid("ad4e3c10-9b3d-452b-a48f-23253c2204e8"), new DateTime(2023, 11, 3, 1, 30, 34, 937, DateTimeKind.Utc).AddTicks(7972), "admin", "password", 1000, new DateTime(2023, 11, 3, 1, 30, 34, 937, DateTimeKind.Utc).AddTicks(7974), "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_NoteTag_TagsGuid",
                table: "NoteTag",
                column: "TagsGuid");
        }
    }
}
