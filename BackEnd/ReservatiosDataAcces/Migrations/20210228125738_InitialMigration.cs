using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservatiosDataAcces.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContactTypes",
                columns: table => new
                {
                    ContactTypeName = table.Column<string>(nullable: false),
                    Decription = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactTypes", x => x.ContactTypeName);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ContactName = table.Column<string>(type: "varchar(8)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "varchar(11)", nullable: false),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    ContactTypeName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ContactName);
                    table.ForeignKey(
                        name: "FK_Users_ContactTypes_ContactTypeName",
                        column: x => x.ContactTypeName,
                        principalTable: "ContactTypes",
                        principalColumn: "ContactTypeName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    ID_Reservation = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ReservationInfo = table.Column<string>(nullable: false),
                    Fecha_Reservacion = table.Column<DateTime>(nullable: false),
                    Votings = table.Column<int>(nullable: false),
                    Voters = table.Column<int>(nullable: false),
                    ContactName = table.Column<string>(type: "varchar(8)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.ID_Reservation);
                    table.ForeignKey(
                        name: "FK_Reservations_Users_ContactName",
                        column: x => x.ContactName,
                        principalTable: "Users",
                        principalColumn: "ContactName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ContactTypes",
                columns: new[] { "ContactTypeName", "Decription" },
                values: new object[] { "Contact_Type_1", "Contact_Type_1" });

            migrationBuilder.InsertData(
                table: "ContactTypes",
                columns: new[] { "ContactTypeName", "Decription" },
                values: new object[] { "Contact_Type_2", "Contact_Type_2" });

            migrationBuilder.InsertData(
                table: "ContactTypes",
                columns: new[] { "ContactTypeName", "Decription" },
                values: new object[] { "Contact_Type_3", "Contact_Type_3" });

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_ContactName",
                table: "Reservations",
                column: "ContactName");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ContactTypeName",
                table: "Users",
                column: "ContactTypeName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "ContactTypes");
        }
    }
}
