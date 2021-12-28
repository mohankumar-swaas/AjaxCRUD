using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AjaxCRUD.Models
{
    public class StudentDB
    {
        string cs = ConfigurationManager.ConnectionStrings["SQLMVCConnectionString"].ConnectionString;

        public List<Studentmodel> ListAll()
        {
            List<Studentmodel> objstudentmodels = new List<Studentmodel>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("Studentsp", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    objstudentmodels.Add(new Studentmodel
                    {
                        id = Convert.ToInt32(rdr["id"]),
                        Name = rdr["Name"].ToString(),
                        Course_name = rdr["Course_name"].ToString()

                    });

                }
                return objstudentmodels;

            }
        }
        public int Add(Studentmodel student)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdatestudent", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", student.id);
                com.Parameters.AddWithValue("@Name", student.Name);
                com.Parameters.AddWithValue("@Course_name", student.Course_name);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(Studentmodel student)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdatestudent", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", student.id);
                com.Parameters.AddWithValue("@Name", student.Name);
                com.Parameters.AddWithValue("@Course_name", student.Course_name);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("deletestudent", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;

        }
    }
}