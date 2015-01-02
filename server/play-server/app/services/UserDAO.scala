package demo.services

import play.modules.reactivemongo.ReactiveMongoPlugin
import play.modules.reactivemongo.json.collection.JSONCollection
import play.api.Play.current
import scala.concurrent.{Future}
import play.api.libs.json.Json
import reactivemongo.api._
import reactivemongo.core.commands._
import play.api._
import demo.models._
import scala.util.{Success, Failure}
import reactivemongo.bson._
import play.modules.reactivemongo.json.BSONFormats._
import play.api.libs.iteratee._


object UserDAO {
  import scala.concurrent.ExecutionContext.Implicits.global

  val driver = new MongoDriver
  val connection = driver.connection(List("localhost:27017"))
  val db = connection("auth")
  val collection = db.collection[JSONCollection]("users")


 def findAll(page: Int, perPage: Int): Future[Seq[User]] = {
    collection.find(Json.obj())
      .options(QueryOpts(page * perPage))
      .sort(Json.obj("_id" -> -1))
      .cursor[User]
      .collect[Seq](perPage)
  }

  def findOneByName(username: String): Future[Option[User]]  = {
    val query = Json.obj("userName" -> username)
    val filter = Json.obj("userId" -> 1, "userName" -> 1, "password" -> 1)
    collection.find(query, filter).one[User]
//   col.onComplete {
//       case Success(u) => Logger.debug("col = " + u)
//     case Failure(t) => Logger.debug("col fail = " + t.getMessage)
 //}
//    col
  }

  def count: Future[Int] = {
    db.command(Count(collection.name))
  }
}
