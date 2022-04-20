declare module "slipjs" {
    class Slip {
        constructor(element: HTMLElement);
        detach(): void;
    }

    export default Slip;
}

declare module "*.css" {
    const classes: Record<string, string>;
    export = classes;
}

declare module "*.scss" {
    const classes: Record<string, string>;
    export = classes;
}