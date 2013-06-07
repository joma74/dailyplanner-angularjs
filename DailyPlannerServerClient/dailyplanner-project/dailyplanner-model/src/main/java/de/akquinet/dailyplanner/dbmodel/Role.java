package de.akquinet.dailyplanner.dbmodel;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;

@Entity
@Table(name = "cm_role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public Role(String name) {
        this.name = name;
    }

    @Basic
    private String name;

    @ManyToMany
    private Collection<User> users = new HashSet<User>();
    ;

    public Collection<User> getUsers() {
        return Collections.unmodifiableCollection(users);
    }

    public void addUser(User user) {
        if (!(users.contains(user))) {
            users.add(user);
            user.addRole(this);
        }
    }

}