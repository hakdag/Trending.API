export abstract class CommonRoutesConfig {
    constructor(protected app: any, private name: string) {
        this.ConfigureRoutes();
    }
    
    abstract ConfigureRoutes(): any;

    public GetName() {
        return this.name;
    }
}
