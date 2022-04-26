export const teams = (): any => {
  const teams = [];
  const names = ["Buffalo Bills","Miami Dolphins","New England Patriots","New York Jets","Baltimore Ravens","Cincinnati Bengals","Cleveland Browns","Pittsburgh Steelers","Denver Broncos","Kansas City Chiefs","Los Angeles Chargers","Las Vegas Raiders","Houston Texans","Indianapolis Colts","Jacksonville Jaguars","Tennessee Titans","Dallas Cowboys","New York Giants","Philadelphia Eagles","Washington","Chicago Bears","Detroit Lions","Green Bay Packers","Minnesota Vikings","Arizona Cardinals","Los Angeles Rams","San Francisco 49ers","Seattle Seahawks","Atlanta Falcons","Carolina Panthers","New Orleans Saints","Tampa Bay Buccaneers"];

  for (let i = 0; i < names.length; i++) {
    teams.push({
      id: i + 1,
      name: names[i],
    })
  }

  return teams;
}