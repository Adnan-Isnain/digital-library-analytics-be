import { IJwtUser } from "@models/interface/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export function hasPermission(roles: string[]) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.user as IJwtUser;

        if (!roles.includes(user.role)) {
            reply.status(401).send({ message: 'Unauthorized: You are not authorized to access this API' });
            return;
        }
    };
}