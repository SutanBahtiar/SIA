package com.sia.open.api.domain.security;

import com.sia.open.api.domain.BaseCreatedChanged;
import com.sia.open.api.mixin.SecManTActivityLogMixin;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "secman_t_activitylog")
public class SecManTActivityLog extends BaseCreatedChanged<Integer> {

    /**
     *
     */
    private static final long serialVersionUID = 8251876100775921263L;

    public SecManTActivityLog() {
    }

    public SecManTActivityLog(Integer id) {
        super(id);
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_log_id")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "user_activity_id_fk", nullable = false)
    private SecManTUserActivity userActivity;
    @Length(max = 5500)
    @Column(name = "user_action", length = 5500)
    private String userAction;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public SecManTUserActivity getUserActivity() {
        return userActivity;
    }

    public void setUserActivity(SecManTUserActivity userActivity) {
        this.userActivity = userActivity;
    }

    public String getUserAction() {
        return userAction;
    }

    public void setUserAction(String userAction) {
        this.userAction = userAction;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SecManTActivityLog that = (SecManTActivityLog) o;

        if (id != null ? !id.equals(that.id) : that.id != null) {
            return false;
        }

        return true;
    }

    @Override
    public Map<Class<?>, Class<?>> getDefaultMixin() {
        Map<Class<?>, Class<?>> result = new HashMap<Class<?>, Class<?>>();

        result.put(SecManTActivityLog.class, SecManTActivityLogMixin.class);
//        result.put(TmStatusKronologis.class, TmStatusKronologisMixin.class);

        return result;
    }

    @Override
    public String toString() {
        return "SecManTActivityLog{"
                + "id=" + id
                + ", userActivity=" + userActivity
                + ", userAction='" + userAction + '\''
                + '}';
    }
}
