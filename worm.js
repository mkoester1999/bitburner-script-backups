/** @param {NS} ns */
export async function main(ns) {

	//mark computer as safe
	ns.write("safe.txt");

	//scan hosts connected to host and add to hosts array
	var hosts = ns.scan();
	
	//loop through hosts length
	for (let i=0; i< hosts.length; i++)
	{
		//if host[i] minimum hacking level <= player hacking level and host doesn't have safe file
		if(ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(hosts[i]) && !ns.fileExists("safe.txt", hosts[i]))
		{
			//if ports need to be open, run
			if(ns.getServerNumPortsRequired(hosts[i]) > 0)
			{
				openPorts(hosts[i], ns);
			}
			
			//nuke
			ns.nuke(hosts[i]);

			//copy hack-template.js and worm.js 
			ns.scp("hack-template.js", hosts[i], "home")
			ns.scp("worm.js", hosts[i], "home")

			//execute worm.js
			ns.exec("worm.js", hosts[i])
						
			
		}
	}

	//finally execute hack-template.js
	//execute hacking-template.js with threads divided from hosts[i] free memory
	let threads = Math.floor((ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname()))/ ns.getScriptRam("hack-template.js") );
	ns. exec("hack-template.js",ns.getHostname(), threads, "zer0")

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
