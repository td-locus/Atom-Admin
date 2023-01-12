interface Admin {
	domain: Domain;
	college: College;
	links: Links;
	skillSet: SkillSet;
	_id: string;
	name: string;
	username: string;
	email: string;
	avatar: string;
	roles: { [key: string]: string };
	interests: string[];
	stacks: string[];
	defaultAvatar: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	bio: string;
	collegeEmail: string;
	resume: string;
	title: string;
	website: string;
	dob: Date;
	phone: string;
	password: string;
	role: string;
}

interface College {
	name: string;
	location: string;
	graduationYear: Date;
}

interface Domain {
	domainPrimary: string;
	domainSecondary: string;
	memberSince: Date;
}

interface Links {
	instagram: string;
	github: string;
	linkedIn: string;
}

interface SkillSet {
	hard: string[];
	soft: string[];
}
