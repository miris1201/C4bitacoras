export interface AuthInterface {
    done:  boolean;
    msg:   string;
    name?:  string;
    uid?:   string;
    token?: string;
    menu?:  MenuAuth[];
}

export interface MenuAuth {
    id_menu:   string;
    texto:     string;
    className: string;
    _children: ChildAuth[];
}
export interface ChildAuth {
    id_menu:  string;
    texto:    string;
    link:     string;
    imp:      string;
    edit:     string;
    elim:     string;
    nuevo:    string;
    exportar: string;
}

export interface FormData {
    user: string;
    password: string;
}