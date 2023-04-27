/** @param {NS} ns */
export async function main(ns) {
	const template = "hack-template.js"
	const target = ns.args[0];
	const hackinglevel = ns.getHackingLevel();
	const requiredRam = ns.getScriptRam(template);
	//start scan and add it to hosts
	let hosts = list_servers(ns);
	
	for(let host of hosts)
	{
		if(ns.getServerRequiredHackingLevel(host) <= hackinglevel && ns.getServerMaxRam(host) >= requiredRam)
		{
			//open ports
			openPorts(host, ns);

			try
			{
				ns.nuke(host);
			}
			catch(e)
			{
				//pass
				ns.print("There was an error nuking host");
				continue;
			}
			//finally execute hack-template.js
			//execute hacking-template.js with threads divided from hosts[i] free memory
			let threads = Math.floor(ns.getServerMaxRam(host) / requiredRam );
			ns.scp(template, host);
			try
			{
				ns.exec(template, host, threads, target);
			}
			catch(e){
				ns.tprint(host + ": " + e);
				continue;
			}
		}
	}

	

	

}


function scan(ns, parent, server, list) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
		
        list.push(child);
        
        scan(ns, server, child, list);
    }
}

export function list_servers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
	ns.print(list);
    return list;
}



function openPorts(_host, ns)
{
	//array with all exes. Useless now
	const executables = [
		"bruteSSH.EXE",
		"FTPCrack.EXE",
		"relaySMTP.EXE",
		"HTTPWorm.EXE",
		"SQLInject.EXE"
		]

		
		//unfortunately I believe this is the only way to execute the programs
	if(ns.fileExists(executables[0], "home"))
		{
			ns.brutessh(_host);
		}
	if(ns.fileExists(executables[1], "home"))
		{
			ns.ftpcrack(_host);
		}
	if(ns.fileExists(executables[2], "home"))
		{
			ns.relaysmtp(_host);
		}
	if(ns.fileExists(executables[3], "home"))
		{
			ns.httpworm(_host);
		}
	if(ns.fileExists(executables[4], "home"))
		{
			ns.sqlinject(_host);
		}
			
}