

class Filter {

    constructor(name, id, condition, enabled, visible) {
        this.condition = condition;
        this.enabled = enabled;
        this.name = name;
        this.id = id;
        this.visible = visible;
    }

    filter(issues) {
        let filtered = [];
        for (let i=0; i<issues.length; i++) {
            if (!this.enabled || this.condition(issues[i])) {
                filtered.push(issues[i]);
            }
        }
        return filtered;
    }

    setEnabled(enabled) {
        if (typeof enabled === 'boolean') {
            this.enabled = enabled;
        }
    }
}