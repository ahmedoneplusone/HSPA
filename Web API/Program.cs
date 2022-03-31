using HSPA_API.Data;
using HSPA_API.Extensions;
using HSPA_API.Helpers;
using HSPA_API.Interfaces;
using HSPA_API.Middlewares;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
var configValue = builder.Configuration.GetConnectionString("Default");
Console.WriteLine(configValue);
// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddDbContext<HSPA_DBContext>(options => options.UseSqlServer(configValue));
builder.Services.AddScoped<IMain, Main>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

var app = builder.Build();

// Configure the HTTP request pipeline.
//app.ConfigureExceptionHandler();
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseAuthorization();

app.MapControllers();

app.Run();
