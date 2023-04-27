/** @param {NS} ns */
export async function main(ns) {
	const script = ns.args[0];
	let requiredRam = ns.getScriptRam(script);
	let hostname = ns.getHostname();
	

	let threads = Math.floor((ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)) / requiredRam );
	ns.tprint("you can run " + script + " with " + threads + " threads");

}