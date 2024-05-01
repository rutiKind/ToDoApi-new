using Microsoft.EntityFrameworkCore;
using TodoApi;



// int id=15;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ToDoDbContext>();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();


//הרשאת CORS 
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

//builder.Services.AddSingleton<ToDoDbContext>();

ToDoDbContext d1=new ToDoDbContext();

builder.Services.AddEndpointsApiExplorer();
var app = builder.Build();


//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}






//כל המשימות
app.MapGet("", async (ToDoDbContext context) =>
        {
            var data = await context.Items.ToListAsync();
            //ToDoDbContext d1=new ToDoDbContext();
            // Get all todo items
            //await context.Response.WriteAsJsonAsync("���� �� �����");
            return Results.Ok(data);
        });

//הוספת משימה
app.MapPost("add/{name}", async (ToDoDbContext context,string name)=>
        {
            var data=await context.Items.ToListAsync();
            Item i1=new Item();
            i1.Name=name;
            i1.IsComplate=false;
            context.Add(i1);
            context.SaveChanges();
            // Get one todo item
            return Results.Ok(data);
        });

//מחיקת מטלה
app.MapDelete("delete/{id}", async (ToDoDbContext context, int id) =>
{
    var data = await context.Items.ToListAsync();
    var remove = data.Where(x=>x.Id==id).ToList();
    foreach (var item in remove)
       context.Items.Remove(item); 
    context.SaveChanges();

    return Results.Ok(data);
});

app.MapPut("updateC/{id}", async (ToDoDbContext context, int id,bool complete) =>
{
    //שאיבת נתונים מהמסד
    var data = await context.Items.FindAsync(id);
 //מציאת האוביקט שהקוד שלו זהה שלקוד שהתקבל 
    if(data==null){
//עדכון עשית הפעולה
     return Results.NotFound();
    }
    data.IsComplate = complete;
    await context.SaveChangesAsync();
    return Results.Ok(data);
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//הרשאת CORS
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapGet("/RUTI", () => "AUSER API ARE RUNNING");

app.Run();

//class Service { }

