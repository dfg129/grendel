organization  := "demo"

version       := "0.1"

scalaVersion  := "2.11.2"

scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")

libraryDependencies ++= {
  val akkaV = "2.3.6"
  Seq(
    "com.typesafe.akka"   %%  "akka-actor"    % akkaV,
    "org.reactivemongo" %% "reactivemongo" % "0.10.5.0.akka23" withSources()
  )
}

resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

lazy val root = (project in file(".")).enablePlugins(PlayScala)
