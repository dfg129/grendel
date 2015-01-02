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
    val col = collection.find(query).one[User]
    Logger.debug("col - " + col.toString())
    col
  }

  def count: Future[Int] = {
    ReactiveMongoPlugin.db.command(Count(collection.name))
  }
}
