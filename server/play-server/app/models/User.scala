package demo.models

case class User(userId: String, userName: String, password: String)

object User {
  import play.api.libs.json.Json
  import play.api.data._
  
  implicit val userFormat = Json.format[User]

}
