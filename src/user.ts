interface USERS {
  UserName:string
  firstName:string
  lastName:string
  LastLogin:Date
  enabled:"Yes"|"No"
}
export const users:USERS[] = 
[
    {UserName: "scar1etw1tch", firstName: "Wanda",lastName:"Maximof",LastLogin:new Date(1996, 8, 20),enabled:"Yes"},
    {UserName: "6lackw1d0w", firstName: "Natasha",lastName:"Romanof",LastLogin:new Date(2000, 2, 22),enabled:"No"},
    {UserName: "Hawkay3", firstName: "Clint",lastName:"Barton",LastLogin:new Date(2004, 7, 28),enabled:"Yes"},
    {UserName: "Dr.Strang3", firstName: "Steven",lastName:"Strange",LastLogin:new Date(2014, 2, 20),enabled:"Yes"},
    {UserName: "sp1d3rman", firstName: "Peter",lastName:"Parker",LastLogin:new Date(2015, 8, 10),enabled:"No"},
    {UserName: "antMan11", firstName: "Scott",lastName:"Lang",LastLogin:new Date(2016, 3, 5),enabled:"Yes"},
    {UserName: "Hu1k65", firstName: "Bruce",lastName:"Banner",LastLogin:new Date(2018, 8, 29),enabled:'Yes'},
    {UserName: "winter.s01id3r", firstName: "Bucky",lastName:"Barnes",LastLogin:new Date(2020, 4, 23),enabled:"No"}
  ]